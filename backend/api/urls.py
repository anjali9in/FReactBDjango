from django.contrib import admin
from django.urls import path
from api.views import CreateUserView
from . import views

urlpatterns = [
    path('notes/', views.NoteListCreateView.as_view(), name='notes_list'),
    path('notes/delete/', views.NoteDeleteView.as_view(), name='notes_delete'),
]
