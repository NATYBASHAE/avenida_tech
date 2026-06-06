export default function PrivacyPolicy() {
  return (
    <div className="pt-24 min-h-screen bg-background">
      <section className="py-32">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="text-muted leading-relaxed space-y-6">
            <p>
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              At Avenida Technologies, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect any information you provide to us.
            </p>
            <h2 className="text-2xl text-foreground font-heading mt-8 mb-4">Information Collection</h2>
            <p>
              We collect information that you voluntarily provide to us when you request a consultation, contact us, or otherwise interact with our website. This may include your name, email address, phone number, and project details.
            </p>
            <h2 className="text-2xl text-foreground font-heading mt-8 mb-4">Use of Information</h2>
            <p>
              The information we collect is used to understand your needs, provide you with better service, and specifically for internal record keeping and improving our products and services.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
