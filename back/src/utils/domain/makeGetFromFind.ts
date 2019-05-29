import { Option } from 'nanoption'
import { EntityNotFoundException } from './EntityNotFoundException'

type Find<Entity, T extends any[]> = (...args: T) => Promise<Option<Entity>>

type RepoWithFind<Entity, T extends any[]> = {
  find: Find<Entity, T>
}

export const makeGetFromFind = <Entity, T extends any[]>(
  entityName: string,
  repo: RepoWithFind<Entity, T>,
) => async (...args: T) => {
  const find: Find<Entity, T> = repo.find.bind(repo)
  const optionalEntity = await find(...args)

  if (optionalEntity.nonEmpty()) {
    return optionalEntity.get()
  }

  throw new EntityNotFoundException(entityName, args)
}
