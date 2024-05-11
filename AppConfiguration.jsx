import React from 'react';
import Toast from 'react-native-toast-message';
import {useContext, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {GlobalContext} from './src/app/context';
import {showErrorToast, toastConfig} from './src/app/toast';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {retrieveStorageItem, setStorageItem} from './src/app/storage';
import {sendOneSignalplayerIdCall} from './src/api/handlers/notifications';
import Config from 'react-native-config';
import {ONE_SIGNAL_PLAYER_ID} from './src/utils/constants';
import branch from 'react-native-branch';

OneSignal.Debug.setLogLevel(LogLevel.Verbose);

OneSignal.initialize(Config.ONE_SIGNAL_APP_ID);

OneSignal.Notifications.requestPermission(true);

const queryClient = new QueryClient();

function AppConfiguration({children}) {
  const {isAuthenticated} = useContext(GlobalContext);

  const sendOneSignalplayerId = async () => {
    const isPLayerIdSet = await retrieveStorageItem(ONE_SIGNAL_PLAYER_ID);
    if (isPLayerIdSet) {
      return;
    }

    try {
      const playerId = OneSignal.User.pushSubscription.getPushSubscriptionId();
      await sendOneSignalplayerIdCall(playerId);
      setStorageItem(ONE_SIGNAL_PLAYER_ID, JSON.stringify(true));
    } catch (error) {
      showErrorToast({
        title: 'Error',
        message: error?.response?.data?.detail,
      });
    }
  };

  useEffect(() => {
    // Listener
    branch.subscribe({
      onOpenStart: ({uri, cachedInitialEvent}) => {
        console.log(`subscribe onOpenStart, will open ${uri} cachedInitialEvent is ${cachedInitialEvent}`);
      },
      onOpenComplete: ({error, params, uri}) => {
        if (error) {
          console.error(`subscribe onOpenComplete, Error from opening uri: ${uri} error: ${error}`);
          return;
        } else if (params) {
          if (!params['+clicked_branch_link']) {
            if (params['+non_branch_link']) {
              console.log(`non_branch_link: ${uri}`);
              // Route based on non-Branch links
              return;
            }
          } else {
            // Handle params
            let referralCode = params?.ref;
            setStorageItem('referralCode', referralCode);
            return;
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      sendOneSignalplayerId();
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}

export default AppConfiguration;
