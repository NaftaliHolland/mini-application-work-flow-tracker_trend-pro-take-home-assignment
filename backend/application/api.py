from ninja import NinjaAPI

api = NinjaAPI()


@api.get("health/")
def get_health(request):
    return {"health": "healthy"}
