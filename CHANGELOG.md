# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com) and this project adheres to [Semantic Versioning](http://semver.org).

## 0.2.0

### Changed

- Renamed isLocalStorageSupported to canUseStorage so we can check for localStorage or sessionStorage support.
- Changed arguments for createScopedStorage to use object destructuring.
- Changed scoped storage to just handle the key prefixing and not add a Promise wrapper.
- Added createWarehouse to wrap up the rest of our functionality to produce a Promise based warehouse API.

## 0.1.0

### Added

- Initial implementation
