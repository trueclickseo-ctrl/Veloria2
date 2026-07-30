export function getReadingTime(content: string): string {
  const wordsPerMinute = 225;
  const cleanText = content.replace(/[#*`~_\[\]()]/g, ''); // strip markdown formatting characters
  const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes <= 1) {
    return '1 min read';
  }
  return `${minutes} min read`;
}
