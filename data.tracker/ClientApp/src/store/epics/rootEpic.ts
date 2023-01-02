import { combineEpics } from 'redux-observable';
import * as projectsPartEpics from './projectsEpics';

export const rootEpics = combineEpics(...(Object as any).values(projectsPartEpics));