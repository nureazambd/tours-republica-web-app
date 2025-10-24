// src/lib/useGeneratePdf.tsx
'use client';

import { useCallback, RefObject } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Generates a PDF from a DOM element (ref) and triggers download.
 * @param ref - ref pointing to the voucher DOM node
 * @param filename - file name for the downloaded PDF
 */
export default function useGeneratePdf() {
  const generate = useCallback(
    async (ref: RefObject<HTMLElement>, filename = 'booking.pdf') => {
      if (!ref?.current) throw new Error('No element to render');

      // optional: increase scale to improve quality
      const scale = 2;

      // Use html2canvas to render the element
      const canvas = await html2canvas(ref.current, {
        scale,
        useCORS: true, // try to allow cross-origin images
        allowTaint: true,
        backgroundColor: '#ffffff', // ensure white background
      });

      // Convert to image data
      const imgData = canvas.toDataURL('image/png');

      // PDF size A4 in mm
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // convert canvas px to mm (1 px = 0.264583 mm at 96dpi)
      const pxToMm = (px: number) => (px * 0.264583);
      const imgWidthMm = pxToMm(canvas.width);
      const imgHeightMm = pxToMm(canvas.height);

      // Fit image preserving aspect ratio
      let renderWidth = pageWidth;
      let renderHeight = (imgHeightMm * pageWidth) / imgWidthMm;
      if (renderHeight > pageHeight) {
        renderHeight = pageHeight;
        renderWidth = (imgWidthMm * pageHeight) / imgHeightMm;
      }

      // Center vertically/horizontally
      const x = (pageWidth - renderWidth) / 2;
      const y = (pageHeight - renderHeight) / 2;

      pdf.addImage(imgData, 'PNG', x, y, renderWidth, renderHeight);
      pdf.save(filename);
    },
    []
  );

  return generate;
}
