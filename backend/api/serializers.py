from rest_framework import serializers
from django.contrib.auth.models import User

from .models import (
    Project,
    Video,
    Comment,
    ProjectMember
)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CommentSerializer(serializers.ModelSerializer):

    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'


class VideoSerializer(serializers.ModelSerializer):

    comments = CommentSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Video
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):

    videos = VideoSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Project

        fields = '__all__'

        read_only_fields = [
            'created_by',
            'created_at'
        ]