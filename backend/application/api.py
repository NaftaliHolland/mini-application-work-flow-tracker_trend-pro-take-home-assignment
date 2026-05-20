from django.db.utils import IntegrityError
from django.utils.crypto import get_random_string
from ninja import NinjaAPI
from utils import generate_random_string

from .models import Application
from .schemas import ApplicationCreateIn

api = NinjaAPI()


@api.get("/health")
def get_health(request):
    return {"health": "healthy"}


@api.get("/applications")
def list_applications(request):
    pass

@api.get("/applications/{application_id}")
def get_application(request, application_id: int):
    pass

@api.post("/applications", response={201: dict})
def create_application(request, payload: ApplicationCreateIn):
    application = Application.objects.create(**payload.dict(), tracking_number=generate_random_string(length=5))

    return 201, {"id": application.id, "tracking_number": application.tracking_number}

@api.patch("/applications/{application_id}")
def update_application_status(request, application_id: int):
    pass

@api.post("/applications/{application_id}/submit")
def submit_application(request, application_id: int):
    pass

@api.post("/applications/{application_id}/reviews")
def review_application(request, application_id: int):
    pass

@api.post("/reviews/{review_id}/decision")
def record_reviewer_decision(self, review_id:int):
    pass


