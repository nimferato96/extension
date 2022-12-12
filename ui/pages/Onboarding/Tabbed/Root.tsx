import React, { ReactElement } from "react"

import { useRouteMatch, Route, Switch } from "react-router-dom"

import SharedBackButton from "../../../components/Shared/SharedBackButton"
import AddWallet from "./AddWallet"
import Done from "./Done"
import ImportSeed from "./ImportSeed"
import SetPassword from "./SetPassword"
import NewSeed from "./NewSeed"
import InfoIntro from "./Intro"
import ViewOnlyWallet from "./ViewOnlyWallet"
import Ledger from "./Ledger"
import { productionNetworks } from "../../../components/TopMenu/TopMenuProtocolList"
import SharedButton from "../../../components/Shared/SharedButton"
import OnboardingRoutes from "./Routes"

const getNetworkIcon = (networkName: string) => {
  const icon = networkName.replaceAll(" ", "").toLowerCase()

  return `/images/networks/${icon}@2x.png`
}

/**
 * Renders a list of production network icons
 */
function SupportedChains(): ReactElement {
  return (
    <div className="supported_chains">
      <span>Supported Chains</span>
      <div className="chain_logos">
        {productionNetworks.map(({ network }) => (
          <img
            width="24"
            height="24"
            key={network.chainID}
            src={getNetworkIcon(network.name)}
            alt={network.name}
          />
        ))}
      </div>
      <style jsx>{`
        .supported_chains {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .supported_chains span {
          font-size: 12px;
          line-height: 16px;
          color: var(--green-40);
        }

        .chain_logos {
          display: flex;
          gap: 10px;
          opacity: 0.8;
        }
      `}</style>
    </div>
  )
}

function LocationBasedContent() {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Route path={OnboardingRoutes.NEW_SEED}>
        <div>
          If you want to preview TallyHo, you can start easier by adding a view
          only account
          <SharedButton type="secondary" size="medium">
            Add preview account
          </SharedButton>
        </div>
      </Route>
      <Route path={OnboardingRoutes.LEDGER}>
        <div>
          Trezor integration comming soon, check out the open
          <a className="external_link" href="https://a.com">
            Gitcoin bounty
          </a>
        </div>
      </Route>
      <Route path={OnboardingRoutes.ADD_WALLET}>
        <div>
          Some of the code for this was written by Community contributors
        </div>
      </Route>
      <Route path={OnboardingRoutes.VIEW_ONLY_WALLET}>
        <div>A good way to take a peak at what Tally Ho offers</div>
      </Route>
      <Route path={OnboardingRoutes.IMPORT_SEED}>
        <div>
          TallyHo offers the possibility of adding multiple recovery phrases
        </div>
      </Route>
      <Route path={OnboardingRoutes.ONBOARDING_COMPLETE}>
        <div>
          done!
          {/* <div className="wallet_shortcut hide">
            <span>
              Did you know that you can open Tally Ho using a keyboard shortcut?
            </span>
            <img
              width="318"
              height="84"
              className="indicator"
              src={
                os === "mac"
                  ? `/images/mac-shortcut${altPressed ? "-option" : ""}${
                      tPressed ? "-t" : ""
                    }.svg`
                  : `/images/windows-shortcut${altPressed ? "-alt" : ""}${
                      tPressed ? "-t" : ""
                    }.svg`
              }
              alt={os === "mac" ? "option + T" : "alt + T"}
            />
          </div> */}
        </div>
      </Route>
      <Route path={path}>
        <div className="onboarding_facts">
          <p>Fully owned by the community</p>
          <p>Accessible to everyone</p>
          <p>100% open source</p>
          <style jsx>
            {`
              .onboarding_facts {
                max-width: 300px;
                color: var(--green-20);
                display: flex;
                flex-direction: column;
                gap: 24px;
              }

              .onboarding_facts p {
                margin: 0;
                text-align: left;
                font-size: 18px;
                line-height: 24px;
              }

              .onboarding_facts p::before {
                content: url("./images/check.svg");
                width: 16px;
                height: 16px;
                margin-right: 16px;
              }
            `}
          </style>
        </div>
      </Route>
    </Switch>
  )
}

function Navigation({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <section className="onboarding_container">
      <style jsx>
        {`
          section {
            width: 100%;
            display: flex;
            height: 100%;
            width: 100%;
          }

          .left_container {
            position: relative;
            width: 50%;
            padding-top: 80px;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow-y: hidden;
            box-sizing: border-box;
          }

          .right_container {
            position: relative;
            padding: 62px 80px 0;
            width: 50%;
            height: 100%;
            box-sizing: border-box;
            background: #04141480;
            overflow-y: hidden;
          }

          .route_based_content {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-grow: 1;
          }

          /* TODO */
          .top {
            display: flex;
            justify-content: space-between;
            width: 32px;
            padding: 3em 6em;
            position: absolute;
            z-index: 999;
          }

          .onboarding_branding {
            width: 100%;
            max-width: 300px;
            padding-bottom: 44px;
            border-bottom: 1px solid var(--green-120);
            margin: 0 auto 38px;
          }

          .supported_chains_container {
            margin-top: auto;
            margin-bottom: 40px;
          }

          @media (max-width: 980px) {
            .left_container {
              display: none;
            }
            .right_container {
              width: 100%;
            }
          }
        `}
      </style>
      <div className="left_container">
        <div className="onboarding_branding">
          <img src="./images/logo_onboarding.svg" alt="Onboarding logo" />
        </div>
        <div className="route_based_content">
          <LocationBasedContent />
        </div>
        <div className="supported_chains_container">
          <SupportedChains />
        </div>
      </div>
      <div className="right_container">
        <div className="back_button">
          <SharedBackButton withoutBackText round />
        </div>
        {children}
      </div>
    </section>
  )
}

export default function Root(): ReactElement {
  return (
    <Navigation>
      <Switch>
        <Route path={OnboardingRoutes.ONBOARDING_START} exact>
          <InfoIntro />
        </Route>
        <Route path={OnboardingRoutes.ADD_WALLET}>
          <AddWallet />
        </Route>
        <Route path={OnboardingRoutes.LEDGER}>
          <Ledger />
        </Route>
        <Route path={OnboardingRoutes.SET_PASSWORD}>
          <SetPassword />
        </Route>
        <Route path={OnboardingRoutes.IMPORT_SEED}>
          <ImportSeed nextPage={OnboardingRoutes.ONBOARDING_COMPLETE} />
        </Route>
        <Route path={OnboardingRoutes.NEW_SEED}>
          <NewSeed />
        </Route>
        <Route path={OnboardingRoutes.VIEW_ONLY_WALLET}>
          <ViewOnlyWallet />
        </Route>
        <Route path={OnboardingRoutes.ONBOARDING_COMPLETE}>
          <Done />
        </Route>
      </Switch>
    </Navigation>
  )
}
