export let STAR_ACTION = () => `

  mutation ($repositoryId: ID!) {
    addStar(input:{starrableId:$repositoryId}) {
      starrable {
        viewerHasStarred
      }
    }
  }

`;

export let WATCH_ACTION = () => `
mutation UpdateWatcher($repositoryId: ID!, $subscribeState: SubscriptionState!){
  updateSubscription(input:{subscribableId:$repositoryId,state:$subscribeState}){
    subscribable{
      id
      viewerSubscription
    }
  }
  
}
`;
