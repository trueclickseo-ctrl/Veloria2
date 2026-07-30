import { siteConfig } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  canonicalUrl?: string;
  type?: 'website' | 'article';
  publishDate?: Date;
  updatedDate?: Date;
  authorName?: string;
}

export function getSEOMetadata(props: SEOProps = {}) {
  const title = props.title 
    ? `${props.title} | ${siteConfig.siteName}` 
    : `${siteConfig.siteName} | ${siteConfig.tagline}`;
    
  const description = props.description || siteConfig.description;
  
  // Resolve absolute image URL
  let imageUrl = siteConfig.defaultImage;
  if (props.image) {
    if (props.image.startsWith('http://') || props.image.startsWith('https://')) {
      imageUrl = props.image;
    } else {
      imageUrl = new URL(props.image, siteConfig.siteUrl).toString();
    }
  } else {
    imageUrl = new URL(siteConfig.defaultImage, siteConfig.siteUrl).toString();
  }

  const canonical = props.canonicalUrl || siteConfig.siteUrl;

  return {
    title,
    description,
    imageUrl,
    canonical,
    type: props.type || 'website',
    twitterCard: 'summary_large_image',
    siteName: siteConfig.siteName,
  };
}
