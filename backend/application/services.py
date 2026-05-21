from django.shortcuts import get_object_or_404

from .models import Application


class OperationNotAllowedException(Exception):
    # I have this so that I can catch a less general Exception in the route handler and return a 400 instead of a 500
    pass

def update_application(application: Application, data: dict) -> Application:

    if application.status != "draft":
        raise OperationNotAllowedException("Only draft applications can be updated")

    for attr, value in data.items():
        setattr(application, attr, value)

    application.save()
    return application

def submit_application(application: Application) -> Application:

    if application.status != "draft":
        raise OperationNotAllowedException("Only draft applications can be submitted")

    application.status = "submitted"

    application.save(update_fields=["status"])

    return application

