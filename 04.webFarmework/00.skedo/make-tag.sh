#!/bin/bash
git tag --delete $1
git push --delete origin $1
git tag $1

