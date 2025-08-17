export default function Footer() {
  const year = new Date().getFullYear();
  return (
    // mt-auto is just redundancy now, but harmless; layout flex handles it.
    <footer className="mt-24 border-t border-[--border] bg-[--bg]">
      <div className="container flex h-[60px] items-center justify-between text-sm text-[--muted]">
        <span>© {year} Bhavesh Sidhwani</span>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/"
            className="text-accent-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            className="text-accent-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="/Bhavesh_Sidhwani_CV.pdf"
            className="text-accent-500"
            download
          >
            Download CV
          </a>
        </div>
      </div>
    </footer>
  );
}
