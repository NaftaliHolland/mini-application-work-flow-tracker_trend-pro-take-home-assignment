from typing import List

from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from django.utils.crypto import get_random_string
from ninja import NinjaAPI, Status
from utils import generate_random_string

from .models import Application
from .schemas import (ApplicationCreateIn, ApplicationOut, ApplicationUpdate,
                      ReviewSchema)
from .services import OperationNotAllowedException
from .services import submit_application as submit
from .services import update_application as update_app

api = NinjaAPI()


@api.get("/health")
def get_health(request):
    return {"health": "healthy"}


@api.get("/applications", response=List[ApplicationOut])
def list_applications(request):

    applications = Application.objects.all()

    return applications

@api.get("/applications/{application_id}", response=ApplicationOut)
def get_application(request, application_id: int):

    application = get_object_or_404(Application, id=application_id)

    return application

@api.post("/applications", response={201: dict})
def create_application(request, payload: ApplicationCreateIn):
    application = Application.objects.create(**payload.dict(), tracking_number=generate_random_string(length=5))

    return 201, {"id": application.id, "tracking_number": application.tracking_number}

@api.patch("/applications/{application_id}", response={200: ApplicationOut, 400: dict, 500: dict})
def update_application(request, application_id: int, payload: ApplicationUpdate):
    application = get_object_or_404(Application, id=application_id)
    data = payload.dict()

    try:
        application = update_app(application=application, data=data)
    except OperationNotAllowedException as e:
        return Status(400, {"message": str(e)})
    except Exception as e:
        return Status(500, {"message": str(e)})

    return application

@api.post("/applications/{application_id}/submit", response={200: ApplicationOut, 400: dict, 500: dict})
def submit_application(request, application_id: int):
    application = get_object_or_404(Application, id=application_id)

    try:
        application = submit(application=application)
    except OperationNotAllowedException as e:
        return Status(400, {"message": str(e)})
    except Exception as e:
        return Status(500, {"message": str(e)})

    return application

@api.post("/applications/{application_id}/reviews", response=ApplicationOut)
def review_application(request, application_id: int):
    application = get_object_or_404(Application, id=application_id)

    application.status = "under_review"

    application.save(update_fields=["status"])

    return application

@api.post("/applications/{application_id}/decision", response=ApplicationOut)
def record_reviewer_decision(request, application_id:int, payload: ReviewSchema):
    data = payload.dict()

    comment = data.get("reviewer_comment")
    application = get_object_or_404(Application, id=application_id)

    application.reviewer_comment = comment

    application.save(update_fields=["reviewer_comment"])

    return application
