import { createRef } from 'react';
import { CommonActions } from '@react-navigation/native';

export const navigationRef = createRef();

export function addFocusListener(component, listener) {
  return component.props.navigation.addListener('focus', listener);
}

export function addBlurListener(component, listener) {
  return component.props.navigation.addListener('blur', listener);
}

export function addTransitionStartListener(component, listener) {
  return component.props.navigation.addListener('transitionStart', listener);
}

export function addTransitionEndListener(component, listener) {
  return component.props.navigation.addListener('transitionEnd', listener);
}

export function isClosingTransition(event) {
  return event.data.closing;
}

export function navigate(routeName, params) {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}
export function navigateBack() {
  navigationRef.current?.dispatch(
    CommonActions.goBack()
  );
}
export function dispatch(action) {
  navigationRef.current?.dispatch(action);
}

export function isActiveRoute(navState, routeName) {
  if (navState.routeName === routeName) {
    return true;
  } else if (navState.routes && navState.routes.length > 0) {
    return isActiveRoute(navState.routes[navState.index], routeName);
  } else {
    return false;
  }
}

export function findRouteRecursively(navState, routeName) {
  if (navState.routeName === routeName) {
    return navState;
  } else if (navState.routes && navState.routes.length > 0) {
    return findRouteRecursively(navState.routes[navState.index], routeName);
  } else {
    return null;
  }
}

export function setRouteParams(routeKey, params) {
  dispatch({
    ...CommonActions.setParams(params),
    source: routeKey,
  });
}

export function isNavigateBack(e) {
  return e.action.type == 'Navigation/BACK';
}

export function isNavigatePopToTop(e) {
  return e.action.type == 'Navigation/POP_TO_TOP';
}

export function isNavigateTo(e, routeName) {
  if (routeName) {
    return (
      e.action.type == 'Navigation/NAVIGATE' && e.action.routeName == routeName
    );
  } else {
    return e.action.type == 'Navigation/NAVIGATE';
  }
}

export function isNavigateToAny(e, routeNames = []) {
  return (
    e.action.type == 'Navigation/NAVIGATE' &&
    routeNames.some((r) => e.action.routeName == r)
  );
}

export function isJumpTo(e) {
  return e.action.type == 'Navigation/JUMP_TO';
}

export function isCompleteTransition(e) {
  return e.action.type == 'Navigation/COMPLETE_TRANSITION';
}

export function isReplace(e) {
  return e.action.type == 'Navigation/REPLACE';
}
