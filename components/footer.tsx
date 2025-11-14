"use client"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center text-muted-foreground">
          <p>&copy; {currentYear} Amaan Mohamed Kalemullah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
