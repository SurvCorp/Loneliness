from django.urls import path
from core import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('auth/user/', csrf_exempt(views.get_authenticated_user)),
    path('auth/register/', csrf_exempt(views.RegisterView.as_view())),
    path('users/', csrf_exempt(views.UserListView.as_view())),
    path('users/<int:pk>/', csrf_exempt(views.UserDetailView.as_view())),
    path('pages/', csrf_exempt(views.PageListView.as_view())),
    path('pages/<int:pk>/', csrf_exempt(views.PageDetailView.as_view())),
    path('pages/<int:page_pk>/components/', csrf_exempt(views.ComponentListView().as_view())),
    path('pages/<int:page_pk>/components/<int:comp_pk>/', csrf_exempt(views.ComponentDetailView().as_view()))
]
