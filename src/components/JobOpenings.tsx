import { useEffect, useState, useMemo } from 'react';
import { X, Search as SearchIcon, ExternalLink, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { JobApplication } from '@/pages/Index';

interface JobOpeningsProps {
  onAdd: (app: Omit<JobApplication, 'id'>) => void;
  onClose: () => void;
}

interface RemoteJob {
  id: number;
  title: string;
  company_name: string;
  url: string;
  candidate_required_location: string;
  publication_date: string;
  description: string;
}

export const JobOpenings = ({ onAdd, onClose }: JobOpeningsProps) => {
  const [keyword, setKeyword] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [jobs, setJobs] = useState<RemoteJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<'remotive' | 'jsearch' | 'linkedin'>('remotive');

  // filter state
  const [countryFilter, setCountryFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [minYears, setMinYears] = useState('');

  const uniqueCountries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.candidate_required_location).filter(Boolean))).sort(),
    [jobs],
  );
  const uniqueCompanies = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.company_name))).sort(),
    [jobs],
  );

  const yearsInDescription = (desc: string) => {
    const regex = /(\d+)\s*\+?\s*years?/gi;
    const nums: number[] = [];
    let match;
    while ((match = regex.exec(desc))) {
      nums.push(parseInt(match[1], 10));
    }
    if (nums.length) return Math.max(...nums);
    // heuristic: treat 'senior' as 4 years, 'mid' as 2, 'junior' as 0
    if (/senior/i.test(desc)) return 4;
    if (/mid/i.test(desc)) return 2;
    return 0;
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const countryOk = countryFilter ? job.candidate_required_location === countryFilter : true;
      const companyOk = companyFilter ? job.company_name === companyFilter : true;
      const yearsOk = minYears
        ? yearsInDescription(job.description) >= parseInt(minYears, 10)
        : true;
      return countryOk && companyOk && yearsOk;
    });
  }, [jobs, countryFilter, companyFilter, minYears]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      if (provider === 'remotive') {
        const params = new URLSearchParams();
        if (keyword.trim()) params.append('search', keyword.trim());
        if (companySearch.trim()) params.append('company_name', companySearch.trim());
        if (locationSearch.trim()) params.append('location', locationSearch.trim());

        const res = await fetch(`https://remotive.com/api/remote-jobs?${params.toString()}`);
        const data = await res.json();
        setJobs(data.jobs.slice(0, 100));
      } else if (provider === 'jsearch') {
        const queryParts = [keyword, companySearch, locationSearch].filter(Boolean).join(' ');
        const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
          queryParts || 'software',
        )}&page=1&num_pages=1`;
        const res = await fetch(url, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
          },
        });
        const data = await res.json();
        const mapped: RemoteJob[] = (data?.data || []).map((j: any) => ({
          id: j.job_id,
          title: j.job_title,
          company_name: j.employer_name,
          url: j.job_apply_link,
          candidate_required_location: j.job_country || 'N/A',
          publication_date: j.job_publisher, // fallback
          description: j.job_description,
        }));
        setJobs(mapped);
      } else if (provider === 'linkedin') {
        const params = new URLSearchParams();
        if (keyword.trim()) params.append('keywords', keyword.trim());
        if (locationSearch.trim()) params.append('location', locationSearch.trim());
        params.append('page', '1');

        const url = `https://linkedin-jobs-search.p.rapidapi.com/?${params.toString()}`;
        const res = await fetch(url, {
          headers: {
            'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'linkedin-jobs-search.p.rapidapi.com',
          },
        });
        const data = await res.json();
        const mapped: RemoteJob[] = (data?.data || data?.jobs || []).map((j: any, idx: number) => ({
          id: j.job_id || idx,
          title: j.title || j.job_title,
          company_name: j.company || j.company_name || 'Unknown',
          url: j.link || j.job_url,
          candidate_required_location: locationSearch || 'N/A',
          publication_date: j.posted_time_friendly || new Date().toISOString(),
          description: j.description || '',
        }));
        setJobs(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-gentle-fade">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              Job Openings
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">Powered by Remotive API</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 focus:ring-2 focus:ring-blue-500"
            aria-label="Close job openings"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchJobs();
            }}
            className="grid sm:grid-cols-3 gap-3"
          >
            {/* Keyword */}
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Keyword (e.g. frontend, devops)"
                className="pl-8"
              />
            </div>

            {/* Company */}
            <Input
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
              placeholder="Company (e.g. Google)"
            />

            {/* Location */}
            <Input
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
              placeholder="Location/Country"
            />

            {/* Provider toggle */}
            <div className="sm:col-span-3 flex items-center gap-2 text-sm">
              <span>Source:</span>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="provider"
                  value="remotive"
                  checked={provider === 'remotive'}
                  onChange={() => setProvider('remotive')}
                />
                Remotive (remote roles)
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="provider"
                  value="jsearch"
                  checked={provider === 'jsearch'}
                  onChange={() => setProvider('jsearch')}
                />
                JSearch (wide)
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="provider"
                  value="linkedin"
                  checked={provider === 'linkedin'}
                  onChange={() => setProvider('linkedin')}
                />
                LinkedIn Jobs
              </label>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={fetchJobs}
                className="ml-auto"
                aria-label="Refresh"
              >
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>

            <Button type="submit" variant="outline" size="sm" className="sm:col-span-3">
              Search
            </Button>
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
            >
              <option value="">All Companies</option>
              {uniqueCompanies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 text-sm">
              <span>Min&nbsp;Years:</span>
              <input
                type="number"
                min="0"
                value={minYears}
                onChange={(e) => setMinYears(e.target.value)}
                className="w-20 px-2 py-1 border border-gray-300 rounded-md"
                placeholder="Any"
              />
            </div>
          </div>

          {/* Jobs list */}
          {loading ? (
            <p className="text-center py-8">Loading...</p>
          ) : filteredJobs.length === 0 ? (
            <p className="text-center py-8 text-gray-600">No jobs found.</p>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="border-l-4 border-blue-400">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                        <p className="text-sm text-gray-600">{job.company_name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(job.publication_date).toLocaleDateString()} • {job.candidate_required_location}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 min-w-fit">
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                        <Button
                          size="sm"
                          onClick={() =>
                            onAdd({
                              company: job.company_name,
                              position: job.title,
                              status: 'pending',
                              dateApplied: new Date(),
                              nextAction: '',
                              deadline: undefined,
                              notes: job.url,
                              priority: 'medium',
                            })
                          }
                        >
                          Track ➕
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 