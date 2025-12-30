import io
import uuid

from django.conf import settings

import cloudinary
import cloudinary.api
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
)

def upload_file(file_content: bytes, prefix: str = "sick_leave") -> dict:
    unique_id = uuid.uuid4().hex
    public_id = f"{prefix}_{unique_id}"

    file_obj = io.BytesIO(file_content)
    file_obj.name = f"{public_id}.pdf"

    uploaded = cloudinary.uploader.upload(
        file_obj,
        public_id=public_id,
        resource_type="raw",
        content_type="application/pdf",
        filename=f"{public_id}.pdf",
        overwrite=False,
    )
    return uploaded


def delete_file(public_id: str):
    return cloudinary.uploader.destroy(public_id, resource_type="raw")


def get_file_url(public_id: str) -> str:
    url, _ = cloudinary_url(
        public_id,
        resource_type="raw",
        flags="attachment",
        attachment=f"{public_id}.pdf",
    )
    return url




