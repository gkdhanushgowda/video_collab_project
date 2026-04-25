from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=255)

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='projects'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ProjectMember(models.Model):

    ROLES = [
        ('creator', 'Creator'),
        ('editor', 'Editor')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='members'
    )

    role = models.CharField(
        max_length=10,
        choices=ROLES
    )

    class Meta:
        unique_together = ('user', 'project')


class Video(models.Model):

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name='videos'
    )

    file = models.FileField(upload_to='videos/')

    version_number = models.IntegerField(default=1)

    parent_video = models.ForeignKey(
        'self',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='child_versions'
    )

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.project.name} - v{self.version_number}"


class Comment(models.Model):

    video = models.ForeignKey(
        Video,
        on_delete=models.CASCADE,
        related_name='comments'
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    timestamp = models.FloatField()

    text = models.TextField()

    resolved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment at {self.timestamp}s"