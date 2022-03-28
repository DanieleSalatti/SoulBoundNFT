import { GenericContract } from 'eth-components/ant/generic-contract';
import { useEthersContext } from 'eth-hooks/context';
import React, { FC } from 'react';

import { IScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useAppContracts } from '~~/config/contractContext';
export interface IMainPageContractsProps {
  scaffoldAppProviders: IScaffoldAppProviders;
}

/**
 * 🎛 this scaffolding is full of commonly used components
    this <GenericContract/> component will automatically parse your ABI
    and give you a form to interact with it locally
 * @param props 
 * @returns 
 */
export const MainPageContracts: FC<IMainPageContractsProps> = (props) => {
  const ethersContext = useEthersContext();
  const soulBoundNFTFactory = useAppContracts('SoulBoundNFTFactory', ethersContext.chainId);
  const soulBoundNFTProxyRegistry = useAppContracts('SoulBoundNFTProxyRegistry', ethersContext.chainId);

  if (ethersContext.account == null) {
    return <></>;
  }

  return (
    <>
      <>
        <GenericContract
          contractName="SoulBoundNFTFactory"
          contract={soulBoundNFTFactory}
          mainnetAdaptor={props.scaffoldAppProviders.mainnetAdaptor}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
        />
        <GenericContract
          contractName="SoulBoundNFTProxyRegistry"
          contract={soulBoundNFTProxyRegistry}
          mainnetAdaptor={props.scaffoldAppProviders.mainnetAdaptor}
          blockExplorer={props.scaffoldAppProviders.targetNetwork.blockExplorer}
        />
      </>
    </>
  );
};
