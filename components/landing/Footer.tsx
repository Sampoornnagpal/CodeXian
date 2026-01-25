export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12 text-center text-gray-500">
      <div className="container mx-auto px-4">
        <p className="mb-4">© 2026 Codexian. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
        </div>
      </div>
    </footer>
  );
}
