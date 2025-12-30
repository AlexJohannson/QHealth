import hashlib

from core.services.cloudinary_service import delete_file, upload_file
from core.services.generate_pdf import generate_pdf

from apps.sick_leaves.models import SickLeavesModel


def create_sick_leave_pdf_and_upload(
    user,
    doctor,
    diagnosis,
    description,
    from_date,
    to_date,
    clinic_name="QHealth",
    logo_path="static/logo_pdf.png",
):

    file_content = generate_pdf(
        user=user,
        doctor=doctor,
        diagnosis=diagnosis,
        description=description,
        from_date=from_date,
        to_date=to_date,
        clinic_name=clinic_name,
        logo_path=logo_path
    )


    uploaded = upload_file(file_content)

    file_url_hash = hashlib.sha256(uploaded["public_id"].encode()).hexdigest()


    sick_leave = SickLeavesModel.objects.create(
        user=user,
        doctor=doctor,
        diagnosis=diagnosis,
        description=description,
        from_date=from_date,
        to_date=to_date,
        file_name=uploaded["original_filename"],
        file_id=uploaded["public_id"],
        file_url_hash=file_url_hash
    )

    return sick_leave


def delete_sick_leave(sick_leave_id):
    try:
        sick_leave = SickLeavesModel.objects.get(id=sick_leave_id)
    except SickLeavesModel.DoesNotExist:
        return None

    delete_file(sick_leave.file_id)
    sick_leave.delete()
    return True



