export default function Footer() {
  const year = new Date().getFullYear();
  return (
    // mt-auto is just redundancy now, but harmless; layout flex handles it.
    <footer className="mt-24 border-t border-[--border] bg-[--bg]">
      <div className="container flex h-[60px] items-center justify-between text-sm text-[--muted]">
        <span>© {year} Bhavesh Sidhwani</span>
        <div className="flex items-center gap-10">
          <a
            href="https://www.github.com/BhaveshSidhwani"
            className="text-accent-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/bhavesh-sidhwani/"
            className="text-accent-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://g7xo711snnm3mcqu.public.blob.vercel-storage.com/Resume/Bhavesh%20Sidhwani_Resume.pdf"
            className="text-accent-500"
            download
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
