# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com) and this project adheres to [Semantic Versioning](http://semver.org).

## UNRELEASED

### Added

- Release now runs babel on the source code and uploads the resulting lib directory as artifiacts to the specific github release.

## 0.6.0 - 2019-09-04

### Added

- DynamoDb backing for warehouse specifically so the problem-picker-lib (which depends on warehouse) could be intregrated with problem-picker.

### Removed

- clear functionality as the idea of clearing the entire warehouse is a little weird and nothing was referencing the function.

## 0.5.0 - 2019-02-14

### Removed

- Removing Rollup and instead defering to consumers to transpile as necessary

## 0.4.0 - 2019-02-13

### Added

- Rollup builds transpiled version of library for consumers

## 0.3.0 - 2019-02-13

### Changed

- Project is public and published to NPM

## 0.2.0 - 2019-02-13

### Changed

- Renamed isLocalStorageSupported to canUseStorage so we can check for localStorage or sessionStorage support.
- Changed arguments for createScopedStorage to use object destructuring.
- Changed scoped storage to just handle the key prefixing and not add a Promise wrapper.
- Added createWarehouse to wrap up the rest of our functionality to produce a Promise based warehouse API.

## 0.1.0 - 2019-02-13

### Added

- Initial implementation
