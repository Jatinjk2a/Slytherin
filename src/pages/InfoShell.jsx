import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function InfoShell() {
  const { slug } = useParams();

  const titleFormat = (str) => {
    return str ? str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Information';
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center py-20 px-6">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-on-surface hover:text-primary transition-colors font-bold">
        <span className="material-symbols-outlined">arrow_back</span>
        Return Home
      </Link>
      
      <div className="max-w-3xl w-full bg-white p-12 rounded-[2rem] shadow-sm border border-outline-variant/30 mt-12">
        <h1 className="text-4xl font-headline font-bold text-on-surface mb-8">
          {titleFormat(slug)}
        </h1>
        
        <div className="space-y-6 text-on-surface-variant leading-relaxed">
          <p>
            Welcome to the official <strong>{titleFormat(slug)}</strong> documentation for README AI. 
            This section outlines the parameters, guidelines, and core philosophies driving our AI engine.
          </p>
          <div className="h-px w-full bg-outline-variant/30 my-8"></div>
          <h2 className="text-xl font-bold text-on-surface">1. Introduction</h2>
          <p>
            The digital curation landscape requires absolute clarity and transparency. Our policies ensure your code remains your property while leveraging our advanced parsing matrix.
          </p>
          <h2 className="text-xl font-bold text-on-surface">2. Data Handling</h2>
          <p>
            All AST transformations are performed completely ephemerally. We do not store your repository contents or generated documentation beyond the scope of a single active server session.
          </p>
          <h2 className="text-xl font-bold text-on-surface">3. Contact & Support</h2>
          <p>
            For any inquiries regarding these terms or engineering constraints, please reach out to our dedicated support cluster via the developer portal.
          </p>
          <br/>
          <p className="text-sm font-bold text-[#cfb095]">Last Updated: Today</p>
        </div>
      </div>
    </div>
  );
}
