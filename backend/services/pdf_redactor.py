import fitz


def redact_pdf(input_pdf, output_pdf, sensitive_words):

    doc = fitz.open(input_pdf)

    for page in doc:

        for word in sensitive_words:

            areas = page.search_for(word)

            for area in areas:
                page.add_redact_annot(area, fill=(0, 0, 0))

        page.apply_redactions()

    doc.save(output_pdf)
    doc.close()