import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "ap-south-1_5KiGDue2y",
    ClientId:"5no3hobs25qde4ui2f8m9lp1gk"
}

export default new CognitoUserPool(poolData);