/**
 * PDF & Text Extraction Service for StudyBuddy
 * Extracts plain text from student PDF slides, lecture notes, or TXT files.
 */

import * as pdfjsLib from 'pdfjs-dist';

// Set worker source to bundled worker or CDN fallback
try {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.7.76'}/pdf.worker.min.mjs`;
} catch (e) {
  console.warn('PDF.js worker setup note:', e);
}

/**
 * Extract text from a TXT file
 */
export async function extractTextFromTxt(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result || '');
    reader.onerror = (error) => reject(new Error('Failed to read TXT file: ' + error.message));
    reader.readAsText(file);
  });
}

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPdf(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    
    // Attempt standard PDF.js document loading
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    
    let fullText = '';
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageString = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      
      fullText += `\n--- Page ${pageNum} ---\n` + pageString + '\n';
    }

    if (fullText.trim().length > 0) {
      return fullText.trim();
    }
    
    throw new Error('No readable text found in PDF (it might be a scanned image-only PDF).');
  } catch (pdfJsError) {
    console.warn('[PDF Extractor] PDF.js extraction encountered issue:', pdfJsError.message, '- attempting resilient text stream parsing fallback');
    
    // Fallback: extract ASCII / UTF-8 text strings directly from PDF buffer
    try {
      const arrayBuffer = await file.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer);
      let text = '';
      let currentWord = '';
      
      for (let i = 0; i < bytes.length; i++) {
        const charCode = bytes[i];
        // Printable ASCII characters
        if (charCode >= 32 && charCode <= 126) {
          currentWord += String.fromCharCode(charCode);
        } else if (charCode === 10 || charCode === 13) {
          if (currentWord.length > 3) {
            text += currentWord + '\n';
          }
          currentWord = '';
        } else {
          if (currentWord.length > 3) {
            text += currentWord + ' ';
          }
          currentWord = '';
        }
      }
      
      // Filter out PDF stream keywords like /Type, /Pages, obj, endobj
      const cleaned = text
        .split('\n')
        .filter(line => !/^(obj|endobj|stream|endstream|xref|trailer|startxref|\/Type|\/Filter)/.test(line.trim()))
        .join('\n')
        .trim();

      if (cleaned.length > 50) {
        return cleaned;
      }
    } catch (fallbackError) {
      console.error('[PDF Extractor] Fallback parsing also failed:', fallbackError);
    }

    throw new Error(`Could not extract text from "${file.name}". ${pdfJsError.message}`);
  }
}
