import regeneratorRuntime from "@babel/runtime/regenerator";
import asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

System.set("app:@babel/runtime/helpers/asyncToGenerator", {
  default: asyncToGenerator,
});

System.set("app:@babel/runtime/regenerator", {
  default: regeneratorRuntime,
});
