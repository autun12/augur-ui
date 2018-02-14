import React from "react";
import { Helmet } from "react-helmet";
import CreateMarketPreview from "modules/create-market/components/create-market-preview/create-market-preview";
import CreateMarketForm from "modules/create-market/components/create-market-form/create-market-form";
import Styles from "modules/create-market/components/create-market-view/create-market-view.styles";
type CreateMarketViewProps = {
  newMarket: object,
  updateNewMarket: (...args: any[]) => any,
  meta?: object,
  history: object,
  universe: object,
  isMobileSmall: boolean
};
const CreateMarketView: React.SFC<CreateMarketViewProps> = p => (
  <section className={Styles.CreateMarketView}>
    <Helmet>
      <title>Create Market</title>
    </Helmet>
    <div>
      <CreateMarketPreview newMarket={p.newMarket} />
      <CreateMarketForm
        newMarket={p.newMarket}
        updateNewMarket={p.updateNewMarket}
        categories={p.categories}
        meta={p.meta}
        availableEth={p.availableEth}
        addOrderToNewMarket={p.addOrderToNewMarket}
        removeOrderFromNewMarket={p.removeOrderFromNewMarket}
        submitNewMarket={p.submitNewMarket}
        isMobileSmall={p.isMobileSmall}
        history={p.history}
        universe={p.universe}
      />
    </div>
  </section>
);
export default CreateMarketView;
