import unicodedata

from fpdf import FPDF


def sanitize_for_pdf(text: str) -> str:
    if not text:
        return ""

    text = unicodedata.normalize("NFKD", text)

    replacements = {
        "’": "'",
        "‘": "'",
        "“": '"',
        "”": '"',
        "–": "-",
        "—": "-",
        "−": "-",
        "‑": "-",
    }

    for bad, good in replacements.items():
        text = text.replace(bad, good)

    text = text.encode("latin1", "ignore").decode("latin1")
    return text


def generate_pdf(
    user,
    doctor,
    diagnosis,
    description,
    from_date,
    to_date,
    clinic_name="QHealth",
    logo_path='static/logo_pdf.png',
):

    diagnosis = sanitize_for_pdf(diagnosis)
    description = sanitize_for_pdf(description)
    clinic_name = sanitize_for_pdf(clinic_name)

    pdf = FPDF('P', 'mm', 'A4')
    pdf.set_auto_page_break(auto=False)
    pdf.add_page()

    pdf.set_draw_color(180, 180, 180)
    pdf.set_line_width(0.5)
    pdf.rect(5, 5, 200, 287)

    if logo_path:
        pdf.image(logo_path, x=10, y=12, w=30)

    pdf.set_font("Arial", "B", 18)
    pdf.set_xy(50, 15)
    pdf.cell(0, 10, clinic_name, align='R')

    pdf.set_font("Arial", "B", 20)
    pdf.set_xy(5, 45)
    pdf.cell(200, 12, "SICK LEAVE CERTIFICATE", align='C')

    start_y = 65
    pdf.set_xy(15, start_y)

    pdf.set_font("Arial", "B", 13)
    pdf.cell(0, 8, "Patient:", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 8, f"{user.profile.name} {user.profile.surname}", ln=True)

    pdf.ln(4)

    pdf.set_font("Arial", "B", 13)
    pdf.cell(0, 8, "Diagnosis:", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.multi_cell(0, 8, diagnosis)

    pdf.ln(4)

    pdf.set_font("Arial", "B", 13)
    pdf.cell(0, 8, "Description:", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.multi_cell(0, 8, description)

    pdf.ln(4)

    pdf.set_font("Arial", "B", 13)
    pdf.cell(0, 8, "Period:", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 8, f"From: {from_date}    To: {to_date}", ln=True)

    pdf.ln(4)

    pdf.set_font("Arial", "B", 13)
    pdf.cell(0, 8, "Doctor:", ln=True)
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 8, f"{doctor.profile.name} {doctor.profile.surname}", ln=True)

    pdf.set_font("Arial", "", 10)
    pdf.set_y(277)

    pdf.set_x(10)
    pdf.cell(95, 10, "Phone: +0000000000", align='L')

    pdf.set_x(105)
    pdf.cell(95, 10, "Document ID: 000000", align='R')

    return pdf.output(dest="S").encode("latin1")