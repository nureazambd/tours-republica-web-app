// src/lib/useGeneratePdf.ts
'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function useGeneratePdf() {
  /**
   * generatePdfFromRef
   * @param refRef - React ref pointing to the DOM node to capture (HTMLElement | null)
   * @param filename - filename for the PDF
   */
  const generatePdfFromRef = async (refRef: React.RefObject<HTMLElement | null>, filename = 'voucher.pdf') => {
    if (!refRef?.current) throw new Error('No element reference provided for PDF generation');

    // Wait a moment if layout changes are expected
    await new Promise((r) => setTimeout(r, 80));

    const element = refRef.current as HTMLElement;

    // html2canvas options
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: false,
      scale: 2,
      logging: false,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidthPx = canvas.width;
    const imgHeightPx = canvas.height;
    const ratio = pageWidth / imgWidthPx;
    const imgHeightPt = imgHeightPx * ratio;

    if (imgHeightPt <= pageHeight) {
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeightPt);
    } else {
      // multi-page slice
      let offsetY = 0;
      let remainingHeight = imgHeightPt;
      while (remainingHeight > 0) {
        const sliceCanvas = document.createElement('canvas');
        const sliceCtx = sliceCanvas.getContext('2d')!;
        // how many source px correspond to one PDF page height
        const sliceHeightPx = Math.floor(pageHeight / ratio);
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = Math.min(sliceHeightPx, canvas.height - Math.floor(offsetY / ratio));

        sliceCtx.drawImage(
          canvas,
          0,
          Math.floor(offsetY / ratio),
          canvas.width,
          sliceCanvas.height,
          0,
          0,
          canvas.width,
          sliceCanvas.height
        );

        const sliceData = sliceCanvas.toDataURL('image/png');
        const slicePtHeight = sliceCanvas.height * ratio;

        if (offsetY > 0) pdf.addPage();
        pdf.addImage(sliceData, 'PNG', 0, 0, pageWidth, slicePtHeight);

        offsetY += slicePtHeight;
        remainingHeight -= slicePtHeight;
      }
    }

    pdf.save(filename);
    return true;
  };

  return generatePdfFromRef;
}
