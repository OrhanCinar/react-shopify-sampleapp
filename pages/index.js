import React, { Component } from "react";
import {
  EmptyState,
  Layout,
  Page,
  TextStyle,
  ResourcePicker
} from "@shopify/polaris";
import store from "store-js";
import ResourceListWithProducts from "../components/ResourceList";

class Index extends Component {
  state = { open: false };

  handleSelection = resource => {
    const idsFromResources = resource.selection.map(product => product.id);
    this.setState({ open: false });
    console.log("resource", resource);
    store.set("ids", idsFromResources);
  };

  render() {
    const emptyState = !store.get("ids");

    return (
      <Page
        primaryAction={{
          content: "Select products",
          onAction: () => this.setState({ open: true })
        }}
      >
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={this.state.open}
          onSelection={resource => this.handleSelection(resource)}
          onCancel={() => this.setState({ open: false })}
        />
        {emptyState ? (
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: "Select products",
                onAction: () => this.setState({ open: true })
              }}
              image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
            >
              <p>Select products to change their price temporarily</p>
            </EmptyState>
          </Layout>
        ) : (
          <ResourceListWithProducts />
        )}
      </Page>
    );
  }
}

export default Index;
