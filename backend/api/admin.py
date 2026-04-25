from django.contrib import admin
from .models import Project, ProjectMember, Video, Comment

admin.site.register(Project)
admin.site.register(ProjectMember)
admin.site.register(Video)
admin.site.register(Comment)
