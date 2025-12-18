from django.contrib import admin
from django.urls import path
from api.views import CreateUserView
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreate.as_view(), name='notes_list'),
    path('notes/delete/<int:pk>/', views.NoteDelete.as_view(), name='notes_delete'),
]
