import { IRef, useEffect as _useEffect } from 'miniprogram-reactivity'
import { overInCurrentModule } from './instance'
import { injectHook, ExtendLefecycle } from './lifecycle'

export function useEffect<T extends any> (callback: (newValue: T, oldValue: T) => any, refs: IRef<any>[]): () => void{
	const stopHandle = _useEffect(callback, refs)

	return overInCurrentModule(
		(currentInstance) => {
			currentInstance && injectHook(currentInstance, ExtendLefecycle.EFFECT, stopHandle)
			return stopHandle
		}
	)
}