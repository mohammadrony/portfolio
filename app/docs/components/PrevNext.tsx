import Link from 'next/link';
import { NavNeighbors } from '@/lib/docs';

interface Props {
  neighbors: NavNeighbors;
}

export default function PrevNext({ neighbors }: Props) {
  const { prev, next } = neighbors;
  if (!prev && !next) return null;

  return (
    <nav
      className="flex items-center justify-between gap-4 mt-10 pt-8 border-t border-slate-200"
      aria-label="Previous and next pages"
    >
      <div className="flex-1">
        {prev && (
          <Link
            href={`/docs/${prev.slug.join('/')}`}
            className="group flex flex-col gap-0.5 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
          >
            <span className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-slate-600">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              Previous
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="flex-1 flex justify-end">
        {next && (
          <Link
            href={`/docs/${next.slug.join('/')}`}
            className="group flex flex-col gap-0.5 p-4 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-right w-full"
          >
            <span className="flex items-center justify-end gap-1 text-xs text-slate-400 group-hover:text-slate-600">
              Next
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </span>
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 truncate">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
