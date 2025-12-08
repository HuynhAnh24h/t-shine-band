// constant/api.video.js

export const videoCategories = [
  { id: 1, name: "Rock", slug: "rock" },
  { id: 2, name: "Ballad", slug: "ballad" },
  { id: 3, name: "Pop", slug: "pop" },
  { id: 4, name: "Acoustic", slug: "acoustic" },
  { id: 5, name: "Live Performance", slug: "live" }
];

export const videos = [
  {
    id: 1,
    title: "Song Title 1",
    youtubeId: "8To_2iRr3iQ", // ID từ URL: youtube.com/watch?v=8To_2iRr3iQ
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "rock",
    views: "1.2M",
    duration: "4:32",
    releaseDate: "2024-01-15",
    description: "Mô tả ngắn về video này..."
  },
  {
    id: 2,
    title: "Song Title 2",
    youtubeId: "8To_2iRr3iQ",
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "ballad",
    views: "850K",
    duration: "5:20",
    releaseDate: "2024-02-20",
    description: "Mô tả ngắn về video này..."
  },
  {
    id: 3,
    title: "Song Title 3",
    youtubeId: "8To_2iRr3iQ",
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "pop",
    views: "2.1M",
    duration: "3:45",
    releaseDate: "2024-03-10",
    description: "Mô tả ngắn về video này..."
  },
  {
    id: 4,
    title: "Song Title 4",
    youtubeId: "8To_2iRr3iQ",
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "acoustic",
    views: "650K",
    duration: "4:15",
    releaseDate: "2024-04-05",
    description: "Mô tả ngắn về video này..."
  },
  {
    id: 5,
    title: "Song Title 5",
    youtubeId: "8To_2iRr3iQ",
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "live",
    views: "3.5M",
    duration: "6:40",
    releaseDate: "2024-05-12",
    description: "Mô tả ngắn về video này..."
  },
  {
    id: 6,
    title: "Song Title 6",
    youtubeId: "8To_2iRr3iQ",
    thumbnail: "https://img.youtube.com/vi/8To_2iRr3iQ/maxresdefault.jpg",
    category: "rock",
    views: "1.8M",
    duration: "4:05",
    releaseDate: "2024-06-18",
    description: "Mô tả ngắn về video này..."
  }
];

// Helper function để lấy videos theo category
export const getVideosByCategory = (category) => {
  if (category === "all") return videos;
  return videos.filter(video => video.category === category);
};