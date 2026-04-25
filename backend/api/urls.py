from django.urls import path

from . import views


urlpatterns = [

    # -----------------------------
    # Projects
    # -----------------------------
    path(
        'projects/',
        views.ProjectViewSet.as_view({
            'get': 'list',
            'post': 'create'
        })
    ),

    # -----------------------------
    # Upload Video
    # -----------------------------
    path(
        'videos/upload/',
        views.upload_video
    ),

    # -----------------------------
    # Edit Video
    # -----------------------------
    path(
        'videos/<int:video_id>/edit/',
        views.edit_video
    ),

    # -----------------------------
    # Comments
    # -----------------------------
    path(
        'videos/<int:video_id>/comments/',
        views.comments
    ),

    # -----------------------------
    # Resolve Comment
    # -----------------------------
    path(
        'comments/<int:comment_id>/resolve/',
        views.resolve_comment
    ),

    # -----------------------------
    # Search Users
    # -----------------------------
    path(
        'users/search/',
        views.search_users
    ),

    # -----------------------------
    # Add Project Member
    # -----------------------------
    path(
        'projects/<int:project_id>/members/',
        views.add_member
    ),
]