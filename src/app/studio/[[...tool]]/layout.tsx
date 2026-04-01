// src/app/studio/[[...tool]]/layout.tsx
export const metadata = {
    title: "Sanity Studio",
    description: "Manage portfolio content",
  };
  
  export default function StudioLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    // We just return the children directly. 
    // Next.js will automatically nest this inside the <body> of your RootLayout.
    return <>{children}</>;
  }