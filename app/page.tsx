import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-black font-heading">ResumeBuilder Pro</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-black hover:text-[rgb(var(--primary))] transition-colors">Features</Link>
            <Link href="#templates" className="text-black hover:text-[rgb(var(--primary))] transition-colors">Templates</Link>
            <Link href="#pricing" className="text-black hover:text-[rgb(var(--primary))] transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-black hover:text-[rgb(var(--primary))] transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link 
              href="/register" 
              className="bg-[rgb(var(--primary))] text-white px-6 py-2 rounded-lg hover:bg-[rgb(var(--primary-dark))] transition-all duration-200 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-green-100 text-[rgb(var(--primary))] px-4 py-2 rounded-full text-sm font-medium mb-8">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Trusted by 10,000+ professionals
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 leading-tight font-heading">
            Build Your Dream
            <br />
            <span className="text-[rgb(var(--primary))]">
              Career Story
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-black mb-12 max-w-3xl mx-auto leading-relaxed">
            Create professional resumes and cover letters with our AI-powered builder. 
            Stand out from the crowd and land your dream job faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/register" 
              className="bg-[rgb(var(--primary))] text-white px-8 py-4 rounded-xl hover:bg-[rgb(var(--primary-dark))] transition-all duration-200 font-semibold text-lg flex items-center group"
            >
              Start Building for Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link 
              href="#demo" 
              className="border border-black text-black px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Watch Demo
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-black font-heading">50K+</div>
              <div className="text-black">Resumes Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-heading">95%</div>
              <div className="text-black">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black font-heading">4.9★</div>
              <div className="text-black">User Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4 font-heading">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-black max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you create, customize, and optimize your resume for any job.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[rgb(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4 font-heading">
                Professional Templates
              </h3>
              <p className="text-black leading-relaxed">
                Choose from 20+ professionally designed templates that are ATS-friendly and recruiter-approved.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[rgb(var(--primary))]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4 font-heading">
                AI-Powered Content
              </h3>
              <p className="text-black leading-relaxed">
                Get intelligent suggestions for skills, experience descriptions, and keyword optimization.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[rgb(var(--primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4 font-heading">
                Easy Customization
              </h3>
              <p className="text-black leading-relaxed">
                Customize colors, fonts, and layouts with our intuitive drag-and-drop editor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-6 font-heading">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-black mb-8">
            Join thousands of professionals who have successfully built their careers with our platform.
          </p>
          <Link 
            href="/register" 
            className="bg-[rgb(var(--primary))] text-white px-8 py-4 rounded-xl hover:bg-[rgb(var(--primary-dark))] transition-all duration-200 font-semibold text-lg inline-flex items-center group"
          >
            Start Your Free Resume
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-[rgb(var(--primary))] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-white font-heading">ResumeBuilder Pro</span>
          </div>
          <p className="text-gray-300">
            © 2024 ResumeBuilder Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
