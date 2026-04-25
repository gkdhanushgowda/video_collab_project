import os
import subprocess

from django.contrib.auth.models import User

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Project,
    Video,
    Comment,
    ProjectMember
)

from .serializers import (
    ProjectSerializer,
    VideoSerializer,
    CommentSerializer,
    UserSerializer
)


# -----------------------------
# Project ViewSet
# -----------------------------
class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer

    def get_queryset(self):
        user = User.objects.first()

        return Project.objects.filter(
        members__user=user
    )

    def perform_create(self, serializer):

        user = User.objects.first()

        project = serializer.save(
        created_by=user
        )

        ProjectMember.objects.create(
            user=user,
            project=project,
            role='creator'
        )


# -----------------------------
# Upload Video
# -----------------------------
@api_view(['POST'])
def upload_video(request):

    project_id = request.data.get('project_id')

    project = Project.objects.get(id=project_id)

    last_video = Video.objects.filter(
        project=project
    ).order_by('-version_number').first()

    version = (
        last_video.version_number + 1
        if last_video else 1
    )

    video = Video.objects.create(
        project=project,
        file=request.FILES['file'],
        version_number=version,
        parent_video=last_video,
        uploaded_by=request.user
    )

    return Response(
        VideoSerializer(video).data
    )


# -----------------------------
# Edit Video
# -----------------------------
@api_view(['POST'])
def edit_video(request, video_id):

    video = Video.objects.get(id=video_id)

    action = request.data.get('action')

    input_path = video.file.path

    output_name = f"edited_{video.id}_{action}.mp4"

    output_path = os.path.join(
        'media/videos/',
        output_name
    )

    # ---------------- TRIM ----------------
    if action == 'trim':

        start = request.data.get('start', '0')

        end = request.data.get('end', '30')

        subprocess.run([
            'ffmpeg',
            '-y',
            '-i',
            input_path,
            '-ss',
            str(start),
            '-to',
            str(end),
            '-c',
            'copy',
            output_path
        ])

    # ---------------- ADD AUDIO ----------------
    elif action == 'add_audio':

        audio_path = request.FILES[
            'audio'
        ].temporary_file_path()

        subprocess.run([
            'ffmpeg',
            '-y',
            '-i',
            input_path,
            '-i',
            audio_path,
            '-map',
            '0:v',
            '-map',
            '1:a',
            '-shortest',
            output_path
        ])

    # ---------------- TEXT OVERLAY ----------------
    elif action == 'text':

        text = request.data.get(
            'text',
            'Hello'
        )

        ts = request.data.get(
            'timestamp',
            '5'
        )

        subprocess.run([
            'ffmpeg',
            '-y',
            '-i',
            input_path,
            '-vf',
            f"drawtext=text='{text}':fontsize=36:fontcolor=white:x=50:y=50:enable='between(t,{ts},{float(ts)+3})'",
            output_path
        ])

    # Create new video version
    new_video = Video.objects.create(
        project=video.project,
        file='videos/' + output_name,
        version_number=video.version_number + 1,
        parent_video=video,
        uploaded_by=request.user
    )

    return Response(
        VideoSerializer(new_video).data
    )


# -----------------------------
# Comments
# -----------------------------
@api_view(['GET', 'POST'])
def comments(request, video_id):

    video = Video.objects.get(id=video_id)

    # GET comments
    if request.method == 'GET':

        return Response(
            CommentSerializer(
                video.comments.all(),
                many=True
            ).data
        )

    # POST comment
    comment = Comment.objects.create(
        video=video,
        user=request.user,
        timestamp=request.data['timestamp'],
        text=request.data['text']
    )

    return Response(
        CommentSerializer(comment).data
    )


# -----------------------------
# Resolve Comment
# -----------------------------
@api_view(['PATCH'])
def resolve_comment(request, comment_id):

    comment = Comment.objects.get(
        id=comment_id
    )

    comment.resolved = True

    comment.save()

    return Response({
        'status': 'resolved'
    })


# -----------------------------
# Search Users
# -----------------------------
@api_view(['GET'])
def search_users(request):

    q = request.GET.get('q', '')

    users = User.objects.filter(
        username__icontains=q
    )[:10]

    return Response(
        UserSerializer(
            users,
            many=True
        ).data
    )


# -----------------------------
# Add Project Member
# -----------------------------
@api_view(['POST'])
def add_member(request, project_id):

    project = Project.objects.get(
        id=project_id
    )

    user = User.objects.get(
        id=request.data['user_id']
    )

    role = request.data.get(
        'role',
        'editor'
    )

    member, created = ProjectMember.objects.get_or_create(
        user=user,
        project=project,
        defaults={'role': role}
    )

    if not created:

        return Response(
            {'error': 'Already a member'},
            status=400
        )

    return Response({
        'status': 'added'
    })
