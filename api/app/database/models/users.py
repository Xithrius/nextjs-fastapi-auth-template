import uuid
from typing import Annotated

from fastapi import Depends
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin, schemas
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyBaseUserTableUUID, SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.base import Base
from app.database.dependencies import get_db_session
from app.settings import settings


class User(SQLAlchemyBaseUserTableUUID, Base):
    """Represents a user entity."""


class UserRead(schemas.BaseUser[uuid.UUID]):
    """Represents a read command for a user."""


class UserCreate(schemas.BaseUserCreate):
    """Represents a create command for a user."""


class UserUpdate(schemas.BaseUserUpdate):
    """Represents an update command for a user."""


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    """Manages a user session and its tokens."""

    reset_password_token_secret = settings.users_secret
    verification_token_secret = settings.users_secret


async def get_user_db(
    session: Annotated[AsyncSession, Depends(get_db_session)],
) -> SQLAlchemyUserDatabase:
    """
    Yield a SQLAlchemyUserDatabase instance.

    :param session: asynchronous SQLAlchemy session.
    :yields: instance of SQLAlchemyUserDatabase.
    """
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(
    user_db: Annotated[SQLAlchemyUserDatabase, Depends(get_user_db)],
) -> UserManager:
    """
    Yield a UserManager instance.

    :param user_db: SQLAlchemy user db instance
    :yields: an instance of UserManager.
    """
    yield UserManager(user_db)


def get_jwt_strategy() -> JWTStrategy:
    """
    Return a JWTStrategy in order to instantiate it dynamically.

    :returns: instance of JWTStrategy with provided settings.
    """
    return JWTStrategy(secret=settings.users_secret, lifetime_seconds=None)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")
auth_jwt = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)
cookie_transport = CookieTransport()
auth_cookie = AuthenticationBackend(
    name="cookie",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

backends = [
    auth_cookie,
    auth_jwt,
]

api_users = FastAPIUsers[User, uuid.UUID](get_user_manager, backends)

current_active_user = api_users.current_user(active=True)
