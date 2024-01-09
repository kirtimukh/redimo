from bson import ObjectId
from typing import Optional, List, Union
from datetime import datetime

from beanie import Document
from pydantic import BaseModel


class LogEntry(BaseModel):
    timestamp: datetime
    message: str

    class Settings:
        name = "LogEntry"


class Task(BaseModel):
    name: str
    notes: Optional[str]
    logs: List[LogEntry]
    subtasks: List["Task"]
    type: str
    completion: Optional[Union[List[int], float]]
    status: str

    class Settings:
        name = "Task"


class ActionGroup(Document):
    name: str
    subtitle: str
    description: Optional[str]
    xboard: str
    notes: Optional[str]
    logs: List[LogEntry]
    task_sets: List[Task] = []

    class Settings:
        name = "ActionGroup"


class XBoard(Document):
    name: str
    subtitle: str
    description: Optional[str]
    owner: str
    notes: Optional[str]
    logs: List[LogEntry]
    action_groups: List[ActionGroup] = []

    class Settings:
        name = "XBoard"
