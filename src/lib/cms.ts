import { useQuery } from '@tanstack/react-query';

export const API = '/api';
export const fileUrl = (f: string, thumb = false, name = '') =>
  `${API}/file.php?f=${thumb ? 't_' : ''}${encodeURIComponent(f)}${name ? `&n=${encodeURIComponent(name)}` : ''}`;

export type Announcement = { id: number; title: string; date: string; category: string; excerpt: string; body: string; link: string };
export type Album = { id: number; name: string };
export type GalleryImage = { id: number; album_id: number; image: string; title: string; description: string };
export type HeroSlide = { id: number; image: string; title: string; subtitle: string; cta: string; cta_link: string };
export type ExamSchedule = { id: number; program: string; date_text: string; status: string };
export type ExamDownload = { id: number; name: string; type: string; size_text: string; file: string; url: string };
export type CalendarEvent = { id: number; event: string; date_text: string };

export type Content = {
  announcements: Announcement[];
  gallery_albums: Album[];
  gallery_images: GalleryImage[];
  hero_slides: HeroSlide[];
  exam_schedules: ExamSchedule[];
  exam_downloads: ExamDownload[];
  calendar_events: CalendarEvent[];
};

export function useContent() {
  return useQuery<Content>({
    queryKey: ['cms-content'],
    queryFn: async () => {
      const r = await fetch(`${API}/content.php`);
      if (!r.ok) throw new Error('CMS unavailable');
      return r.json();
    },
    staleTime: 60_000,
    retry: 1,
  });
}

/** CMS rows when the API answered with at least one row; otherwise the built-in fallback. */
export function useSection<K extends keyof Content, T>(key: K, fallback: T[], map: (row: Content[K][number]) => T): T[] {
  const { data } = useContent();
  const rows = data?.[key];
  return rows && rows.length ? (rows as Content[K][number][]).map(map) : fallback;
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
