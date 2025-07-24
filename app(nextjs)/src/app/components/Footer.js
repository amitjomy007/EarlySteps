const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Team Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Team: EARLYSTEPS</h3>
            <p className="text-brand-light/80">
              Early Detection for a Brighter Future
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <p className="text-brand-light/80">
              Email: <a href="mailto:earlystepsorg@gmail.com" className="text-brand-teal hover:text-brand-accent transition-colors">
                earlystepsorg@gmail.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              <a href="/login" className="block text-brand-light/80 hover:text-brand-teal transition-colors">
                Login
              </a>
              <a href="/register" className="block text-brand-light/80 hover:text-brand-teal transition-colors">
                Register
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-light/20 mt-8 pt-8 text-center">
          <p className="text-brand-light/60">
            © 2025 EarlySteps. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;