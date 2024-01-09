from typing import Optional, List, Union
from datetime import datetime

from beanie import Document, BeanieObjectId

from pydantic import BaseModel


class LogEntry(BaseModel):
    timestamp: datetime
    message: str

    task: Optional[BeanieObjectId]
    action_group: Optional[BeanieObjectId]
    xboard: Optional[BeanieObjectId]

    class Settings:
        name = "LogEntry"


class Task(BaseModel):
    name: str
    action_group: BeanieObjectId
    parent_task: Optional[BeanieObjectId]
    level: int
    type: Optional[str]
    notes: Optional[str]
    completion: Optional[Union[List[int], float]]
    status: Optional[str]

    class Settings:
        name = "Task"


class ActionGroup(Document):
    name: str
    xboard: BeanieObjectId
    subtitle: Optional[str] = ""
    description: Optional[str] = ""
    notes: Optional[str] = ""

    class Settings:
        name = "ActionGroup"


class XBoard(Document):
    name: str
    owner: BeanieObjectId
    subtitle: Optional[str] = ""
    description: Optional[str] = ""
    notes: Optional[str] = ""

    class Settings:
        name = "XBoard"
