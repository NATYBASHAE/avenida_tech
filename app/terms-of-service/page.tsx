export default function TermsOfService() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <section className="py-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
          <div className="text-muted leading-relaxed space-y-6">
            <p>
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              Welcome to Avenida Technologies. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            <h2 className="text-2xl text-foreground font-heading mt-8 mb-4">Use of Website</h2>
            <p>
              The content of the pages of this website is for your general information and use only. It is subject to change without notice. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose.
            </p>
            <h2 className="text-2xl text-foreground font-heading mt-8 mb-4">Service Limitations</h2>
            <p>
              Avenida Technologies reserves the right to modify or discontinue any aspect of our services or website at any time without prior notice.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
